import { Icon } from "@/components/Icon";
import { Stagger } from "@animatereactnative/stagger";
import { LinearGradient } from "expo-linear-gradient";
import { icons } from "lucide-react-native";
import { cssInterop } from "nativewind";

Object.keys(icons).forEach((key) => {
  const IconComponent = icons[key];
  cssInterop(IconComponent, {
    className: "style",
  });
});

cssInterop(Icon, {
  className: "style",
});
cssInterop(LinearGradient, {
  className: "style",
});

cssInterop(Stagger, {
  className: "style",
});
