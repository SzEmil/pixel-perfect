pipeline {

    environment {
    registry = "szemil/my-nextjs-app"
    registryCredential = 'docker-hub-credentials'
    dockerImage = ''
    }

    agent any
    // agent { 
    //     node {
    //         label 'docker-jenkins-agent'
    //         }
    //   }
    tools {
        nodejs "node"
  //      dockerTool "docker"
    }

    stages {
        
        stage('Cloning our Git') {
            steps {
                git branch: 'main', url: 'https://github.com/SzEmil/pixel-perfect.git'
            }
        }

        stage('Build') {
            steps {
                echo 'building'
                sh 'npm install'
            }
        }


        stage('Building Docker Image') {
            steps {
                script {
                    dockerImage = docker.build registry + ":$BUILD_NUMBER"
                }
            }
        }

        stage('Deploying Docker Image to Dockerhub') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'registryCredential') {
                    dockerImage.push()
                    }
                }
            }
        }
        
    }
}
