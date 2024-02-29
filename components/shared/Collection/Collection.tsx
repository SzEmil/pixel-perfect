"use client"
import { CollectionCard } from './components/CollectionCard';
import { Searchbar } from '../Searchbar/Searchbar';
import { Pagination } from '../Pagination/Pagination';

type CollectionProps = {
  images: CloudinaryImage[];
  hasSearch?: boolean;
  totalPages?: number;
  page: string;
};

export const Collection = ({
  images,
  hasSearch = false,
  totalPages = 1,
  page,
}: CollectionProps) => {
  return (
    <>
      <div className="collection-heading">
        <h2 className="h2-bold text-dark-600">Community Edits</h2>
        {hasSearch && <Searchbar />}
      </div>

      {images.length > 0 ? (
        <ul className="collection-list">
          {images.map(image => (
            <CollectionCard image={image} key={image._id} />
          ))}
        </ul>
      ) : (
        <div className="collection-empty">
          <p className="p-20-semibold">Empty List</p>
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} />
    </>
  );
};
