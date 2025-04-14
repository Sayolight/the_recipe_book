import Image from "next/image";

export const RecipeThumb = (props: {
  id: number;
  img: string;
  name: string;
}) => {
  return (
    <li className="flex justify-between gap-x-6 px-2 py-2 my-2 rounded-md bg-gray-100">
      <div className="flex min-w-0 gap-x-4">
        <Image
          alt=""
          src={props.img}
          width={100}
          height={100}
          className="size-12 flex-none rounded-full bg-gray-50"
        />
        <div className="min-w-0 flex-auto">
          <a
            href={"/recipe/" + props.id}
            className="text-sm/6 font-semibold text-gray-900"
          >
            {props.name}
          </a>
          <br />
          <a
            href={"/recipe/" + props.id}
            className="text-sm/6 text-blue-600 hover:text-blue-800 visited:text-purple-600"
          >
            View Recipe
          </a>
        </div>
      </div>
    </li>
  );
};
