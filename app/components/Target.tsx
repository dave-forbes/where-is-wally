import Image from "next/image";

interface TargetProps {
  src: any;
}

const Target = ({ src }: TargetProps) => {
  return (
    <div className="cursor-pointer border-2 border-transparent hover:border-black transition duration-300 ease-in-outs">
      <Image src={src} alt={""} className="w-20 h-auto " />
    </div>
  );
};

export default Target;
