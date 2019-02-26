import OverwriteError from "./error/OverwriteError";
import UndefinedVariableError from "./error/UndefinedVariableError";
import OptionNotSupportedError from "./error/OptionNotSupportedError";

class ColumnDimension {
  constructor() {
    this._fixedCols = 0;

    this._colNames =  [undefined, undefined];
    this._colsFixed = [undefined, undefined];
  }

  get dimensions() {
    return 2-this._fixedCols;
  }

  getColChosen(num) {
    return (this._colsFixed[num-1] !== undefined);
  }

  setColFixed(num, fixed) {
    if (this.getColChosen(num)) {
      throw new OverwriteError("col"+num);
    } else {
      if (fixed) {
        this._colsFixed[num-1] = true;
        ++this._fixedCols;
      } else {
        this._colsFixed[num-1] = false;
      }
    }
  }
  getColFixed(num) {
    if (this.getColChosen(num)) {
      return this._colsFixed[num-1];
    } else {
      throw new UndefinedVariableError('col'+num+' has not been chosen to be fixed or free');
    }
  }

  getColNameChosen(num) {
    if (this.getColFixed(num)) {
      return (this._colNames[num-1] !== undefined);
    } else {
      throw new OptionNotSupportedError('col'+num+' name');
    }
  }

  get colsComplete() {
    return (
      this.getColChosen(1) && (
        !this.getColFixed(1) || this.getColNameChosen(1)
      ) && (
        this.getColChosen(2) && (
          !this.getColFixed(2) || this.getColNameChosen(2)
        )
      )
    );
  }

  setColName(num, name) {
    if (this.getColFixed(num)) {
      this._colNames[num-1] = name;
    } else {
      throw new OptionNotSupportedError('col'+num+' name');
    }
  }
  getColName(num) {
    if (this.getColNameChosen(num)) {
      return this._colNames[num-1];
    } else {
      throw new UndefinedVariableError('col'+num+' name');
    }
  }
}

export default ColumnDimension;