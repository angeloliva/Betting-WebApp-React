import { makeLazyLoader } from "../../Commons/utils/makeLazyLoader"
import ScreenSpinner from "../../components/ScreenSpinner"

const loadComponent = () =>
  import("./SimulatorScreen").then(module => module.default)

export default makeLazyLoader(loadComponent, ScreenSpinner)
