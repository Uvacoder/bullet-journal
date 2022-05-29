import React from "react";
import { Grid, DefaultProps, GridProps, ColProps } from "@mantine/core";

type Props = {
  items: React.ReactNode[];
  id: string;
  gridProps?: GridProps;
  colProps?: ColProps;
};

/**
 * Responsive Grid Layout
 * @param param0
 * @returns
 */
export const GridLayout: React.FC<Props> = ({
  items = [],
  id,
  gridProps,
  colProps,
}) => {
  return (
    <Grid {...gridProps}>
      {items.map((item, index) => {
        const listKey = `GridLayout_${id}_item_${index}`;
        return (
          <Grid.Col md={6} lg={4} xl={4} {...colProps} key={listKey}>
            {item}
          </Grid.Col>
        );
      })}
    </Grid>
  );
};
