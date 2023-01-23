import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParam] = useSearchParams();
  const keyword = searchParam.get("keyword");
  console.log(keyword);
  return null;
};

export default Search;
