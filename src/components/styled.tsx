/*
 * .
 *        . * .
 *      * RRRR  *   Copyright (c) 2012 - 2025
 *     .  RR  R  .  EUIPO - European Union Intellectual Property Office
 *     *  RRR    *
 *      . RR RR .   ALL RIGHTS RESERVED
 *       *. _ .*
 * .
 *  The use and distribution of this software is under the restrictions exposed in 'license.txt'
 */

import { Box, BoxProps, styled } from "@mui/material";

export const SummaryContainer = styled(
  ({ Icon, children, ...props }: BoxProps & { Icon?: React.ElementType }) => (
    <Box {...props}>
      {Icon && (
        <Box
          sx={{
            position: "absolute",
            top: -20,
            right: -20,
            opacity: 0.1,
            transform: "rotate(15deg)",
          }}
        >
          <Icon sx={{ fontSize: 120 }} />
        </Box>
      )}
      {children}
    </Box>
  )
)(({ theme }) => ({
  position: "relative",
  background: theme.palette.primary.main,
  borderRadius: theme.spacing(1),
  padding: theme.spacing(4),
  color: "white",
}));
