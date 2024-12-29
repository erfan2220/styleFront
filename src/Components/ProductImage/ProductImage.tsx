import Image from "next/image";

interface ProductImageProps {
    imageName: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ imageName }) => {
    return (
        <div>
            <Image
                src={`/images/${imageName}`}
                alt={imageName}
                width={200}
                height={200}
                className="rounded-md"
            />
        </div>
    );
};

export default ProductImage;