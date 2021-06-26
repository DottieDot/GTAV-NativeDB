import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function useTypedSelector<TSelected>(selector: (state: RootState) => TSelected) {
  return useSelector(selector)
}
