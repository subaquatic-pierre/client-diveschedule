import React from "react";
import clsx from "clsx";
import { makeStyles, colors } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    background: colors.grey[50],
  },
  inner: {
    width: "100%",
    margin: "0 auto",
    padding: theme.spacing(6, 2),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(8, 8),
    },
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(12, 8),
    },
  },
  innerNarrowed: {
    maxWidth: 800,
  },
}));

/**
 * Component to display the alternative sections
 *
 * @param {Object} props
 */
const SectionAlternate = ({
  children,
  innerNarrowed,
  className,
  ...rest
}: SectionAlternateProps): JSX.Element => {
  const classes = useStyles();

  return (
    <section
      className={clsx("section-alternate", classes.root, className)}
      {...rest}
    >
      <div
        className={clsx(
          "section-alternate__content",
          classes.inner,
          innerNarrowed ? classes.innerNarrowed : {}
        )}
      >
        {children}
      </div>
    </section>
  );
};

export default SectionAlternate;
