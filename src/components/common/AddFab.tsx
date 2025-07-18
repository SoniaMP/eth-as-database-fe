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

import { Fab, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AddFab: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const theme = useTheme();

  return (
    <Fab
      color="primary"
      aria-label="add"
      onClick={onClick}
      sx={{
        position: "fixed",
        bottom: 24,
        right: 24,
        boxShadow: theme.shadows[8],
      }}
    >
      <AddIcon />
    </Fab>
  );
};

export default AddFab;
