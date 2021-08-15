import {
  BoxProps,
  Heading,
  HeadingProps,
  Image,
  ImageProps,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import React from "react";

export type CardProps = BoxProps;

export default function Card({ children, ...props }: CardProps) {
  let image: React.ReactNode;
  let title: React.ReactNode;
  const rest: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      switch (child.type) {
        case CardImage:
          image = child;
          return;
        case CardTitle:
          title = child;
          return;
      }
    }

    rest.push(child);
  });

  return (
    <Stack
      direction={["column", "row"]}
      alignItems={["flex-start", "center"]}
      padding={[2, 4]}
      margin={[2, 4]}
      boxShadow="0px 12px 24px 0px rgb(0 0 0 / 30%)"
      borderRadius={[8, 16]}
      position="relative"
      _before={{
        content: "''",
        display: "block",
        background: "linear-gradient(to right, #546180 0%, #364163 100%)",
        borderRadius: [8, 16],
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
      {...props}
    >
      {image}
      {title}
      <Spacer />
      <Stack>{rest}</Stack>
    </Stack>
  );
}

export function CardImage(props: ImageProps) {
  return <Image width={32} height={32} borderRadius={16} {...props} />;
}

export function CardTitle({ children, ...props }: HeadingProps) {
  return (
    <Heading as="h4" size="md" {...props}>
      {children}
    </Heading>
  );
}
