import Image from "next/image";

interface TargetProps {
  src: any;
}

const Target = ({ src }: TargetProps) => {
  return (
    <Image
      src={src}
      alt={""}
      className="w-20 h-auto cursor-pointer hover:border-black-500 transition duration-300 ease-in-out"
    />
  );
};

export default Target;
