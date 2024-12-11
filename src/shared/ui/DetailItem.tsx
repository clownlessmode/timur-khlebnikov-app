interface Props {
  icon: React.ElementType;
  label: string | React.ReactNode;
  className?: string;
}

const DetailItem: React.FC<Props> = ({ icon: Icon, label, className }) => (
  <div className={`flex gap-2 text-muted-foreground items-center ${className}`}>
    <Icon className="w-5 h-5" />
    <span>{label}</span>
  </div>
);

export default DetailItem;
