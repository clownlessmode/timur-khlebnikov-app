interface Props {
  trigger?: React.ReactNode;
}
const NotFound = ({ trigger }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background px-4">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-muted-foreground mb-2">
          Ничего не найдено
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          К сожалению, мы не нашли результатов по вашему запросу.
        </p>
        {trigger}
      </div>
    </div>
  );
};

export default NotFound;
