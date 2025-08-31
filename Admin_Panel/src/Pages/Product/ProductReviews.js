/** @format */
import HOC from "../../Layout/HOC"; 
import data from "../../Constant/constant.json";
import { useParams } from "react-router-dom";
import TableLayout from "../../Component/TableLayout";

const ProductReviews = () => {
  const { id } = useParams();

  const thead = ["Sno.", "Rating", "Comment", "User", ""];
  const tbody = data?.reviews?.map((i, index) => [
    `#${index + 1}`,
    i.star,
    i.description,
    i.user,
    <i className="fa-sharp fa-solid fa-trash" />,
  ]);
  return (
    <>
      <section className="sectionCont">
        <div className="pb-4  w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            {id} Reviews ({data?.reviews?.length})
          </span>
        </div>

        <TableLayout thead={thead} tbody={tbody} />
      </section>
    </>
  );
};

export default HOC(ProductReviews);
