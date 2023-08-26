interface Props {
  href: string;
  name: string;
}

const ImageCard = ({ href }: Props) => {
  return (
    <div className="relative">
      <img src={href} alt="" className="rounded-md" />
    </div>
  );
};

export default ImageCard;
