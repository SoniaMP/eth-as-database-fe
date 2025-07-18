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

import { useSnackbar } from "notistack";

export function useAppSnackbar() {
  const { enqueueSnackbar } = useSnackbar();

  const showSuccess = (message: string) =>
    enqueueSnackbar(message, { variant: "success" });
  const showError = (message: string) =>
    enqueueSnackbar(message, { variant: "error" });
  const showInfo = (message: string) =>
    enqueueSnackbar(message, { variant: "info" });
  const showWarning = (message: string) =>
    enqueueSnackbar(message, { variant: "warning" });

  return { showSuccess, showError, showInfo, showWarning };
}
