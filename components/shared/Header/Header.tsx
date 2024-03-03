type HeaderProps = {
  title: string;
  subtitle?: string;
  transformationPrice?: number;
};

export const Header = ({
  title,
  subtitle,
  transformationPrice,
}: HeaderProps) => {
  return (
    <div className="flex w-full justify-between">
      <div>
        <h2 className="h2-bold text-dark-600 dark:text-white">{title}</h2>
        {subtitle && (
          <p className="p-16-regular mt-4 dark:text-dark-500">{subtitle}</p>
        )}
      </div>
      {transformationPrice && <p className="font-[500]">Cost: {transformationPrice} credits</p>}
    </div>
  );
};
