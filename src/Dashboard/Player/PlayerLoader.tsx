import { makeLazyLoader } from "../../Commons/utils/makeLazyLoader"
import ScreenSpinner from "../../components/ScreenSpinner"

const loadComponent = () =>
  import("./PlayerScreen").then(module => module.default)

export default makeLazyLoader(loadComponent, ScreenSpinner)
