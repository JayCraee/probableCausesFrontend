import OverwriteError from "./error/OverwriteError";
import OptionNotSupportedError from "./error/OptionNotSupportedError";
import UndefinedVariableError from "./error/UndefinedVariableError";

class RowDimension {
  constructor() {
    this._fixedRows = 0;

    this._limit = 50;
    this._orderBy = 'ASC';

    this._row1Condition = '';
    this._row2Condition = '';
  }

  get dimensions() {
    return this._fixedRows;
  }

  set row1Fixed(fixed) {
    if (this._row1Fixed === undefined) {
      if (fixed) {
        this._row1Fixed = true;
        ++this._fixedRows;
      } else {
        this._row1Fixed = false;
      }
    } else {
      throw new OverwriteError('row1');
    }
  }
  set row2Fixed(fixed) {
    if (this._row2Fixed === undefined) {
      if (fixed) {
        this._row2Fixed = true;
        ++this._fixedRows;
      } else {
        this._row2Fixed = false;
      }
    } else {
      throw new OverwriteError('row2');
    }
  }

  get row1Chosen() {
    return !(this._row1Fixed === undefined);
  }
  get row2Chosen() {
    return !(this._row2Fixed === undefined);
  }

  get row1Fixed() {
    if (this.row1Chosen) {
      return this._row1Fixed;
    } else {
      throw new UndefinedVariableError('row1 has not been chosen')
    }
  }
  get row2Fixed() {
    if (this.row2Chosen) {
      return this._row2Fixed;
    } else {
      throw new UndefinedVariableError('row2 has not been chosen')
    }
  }

  get row1ConditionChosen() {
    return (this._row1Condition !== '' && this._row1Condition !== undefined);
  }
  get row2ConditionChosen() {
    return (this._row2Condition !== '' && this._row2Condition !== undefined);
  }

  set row1Condition(condition) {
    if (this.row1Fixed) {
      this._row1Condition = condition;
    } else {
      throw new OptionNotSupportedError('row1 condition');
    }
  }
  set row2Condition(condition) {
    if (this.row2Fixed) {
      this._row2Condition = condition;
    } else {
      throw new OptionNotSupportedError('row2 condition');
    }
  }
  get row1Condition() {
    if (this.row1Fixed) {
      return this._row1Condition;
    } else {
      throw new OptionNotSupportedError('row1 condition')
    }
  }
  get row2Condition() {
    if (this.row2Fixed) {
      return this._row2Condition;
    } else {
      throw new OptionNotSupportedError('row2 condition')
    }
  }

  set orderBy(orderBy) {
    if (this.orderBySupported) {
      this._orderBy = orderBy;
    } else {
      throw new OptionNotSupportedError('order by');
    }
  }
  get orderBy() {
    if (this.orderBySupported) {
      return this._orderBy;
    } else {
      throw new OptionNotSupportedError('order by');
    }
  }
  get orderBySupported() {
    return false;
  }

  set limit(limit) {
    if (this._fixedRows < 2) {
      this._limit = limit;
    } else {
      throw new OptionNotSupportedError('limit');
    }
  }
  get limit() {
    if (this._fixedRows < 2) {
      return this._limit;
    } else {
      throw new OptionNotSupportedError('limit');
    }
  }
  get limitSupported() {
    return (this._fixedRows < 2);
  }

}

export default RowDimension;