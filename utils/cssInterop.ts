import { Stagger } from "@animatereactnative/stagger";
import { LinearGradient } from "expo-linear-gradient";
import { cssInterop } from "nativewind";

cssInterop(LinearGradient, {
  className: "style",
});

cssInterop(Stagger, {
  className: "style",
});
