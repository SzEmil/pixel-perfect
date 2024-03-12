pipeline {

    environment {
    registry = "szemil/my-nextjs-app"
    registryCredential = 'docker-hub-credentials'
    dockerImage = ''
    }
    agent any
    tools {
        nodejs "node"
    }

    stages {


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
