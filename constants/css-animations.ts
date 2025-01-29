import { css } from "react-native-reanimated";

const angle = 4;
export const cssAnimations = css.create({
  shakeX: {
    animationName: {
      "10%, 30%, 50%, 70%, 90%": {
        transform: [
          {
            translateX: -10,
          },
          {
            translateY: 0,
          },
        ],
      },
      "20%, 40%, 60%, 80%": {
        transform: [
          {
            translateX: 10,
          },
          {
            translateY: 0,
          },
        ],
      },
    },
  },
  tada: {
    animationName: {
      from: {
        transform: [
          {
            scale: 1,
          },
          {
            rotateZ: `${angle}deg`,
          },
        ],
      },
      "10%, 20%": {
        transform: [
          {
            scale: 1,
          },
          {
            rotateZ: `-${angle}deg`,
          },
        ],
      },
      "30%, 50%, 70%, 90%": {
        transform: [
          {
            scale: 1,
          },

          {
            rotateZ: `${angle}deg`,
          },
        ],
      },
      "40%, 60%, 80%": {
        transform: [
          {
            scale: 1,
          },
          {
            rotateZ: `-${angle}deg`,
          },
        ],
      },
      to: {
        transform: [
          {
            scale: 1,
          },
          {
            rotateZ: `-${angle}deg`,
          },
        ],
      },
    },
  },
});
