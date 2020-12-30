import {
  useParams
} from "react-router-dom";


export default function ViewPage () {
  console.log(
    "SEE ME"
  )
  const pars =   useParams();
  console.log(
    'VIEW paParms', pars
);

    return (
      <div>
        View Page
      </div>
    );
}
  