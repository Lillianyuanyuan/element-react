import React from 'react'
import { Component, PropTypes } from '../../libs'

export default class CheckBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: Boolean(props.checked),
      focus: Boolean(props.focus),
      label: this.getLabel(),
    };
  }

  getLabel() {
    let label;
    if (this.props.trueLabel || this.props.falseLabel) {
      label = this.props.checked ? this.props.trueLabel : this.props.falseLabel;
    }else {
      label = this.props.label;
    }
    return label;
  }

  onFocus() {
    this.setState({
      focus: true
    });
  }

  onBlur() {
    this.setState({
      focus: false
    });
  }

  onChange(e) {
    const { label } = this.state;
    const { trueLabel, falseLabel} = this.props;
    const checked = e.target.checked;
    let newLabel = label;

    if (this.props.trueLabel || this.props.falseLabel) {
      newLabel = checked ? trueLabel : falseLabel;
    }

    if (this.props.onChange) {
      this.props.onChange(e);
    }

    this.setState({
      checked: checked,
      label: newLabel,
    });
  }

  render() {
    return (
      <label className="el-checkbox">
        <span className="el-checkbox__input">
          <span
            className={
            this.classNames("el-checkbox__inner",
            {'is-disabled': this.props.disabled},
            {'is-checked': this.state.checked},
            {'indeterminate': this.props.indeterminate},
            {'is-focus': this.state.focus})}>
          </span>
          <input
            className="el-checkbox__original"
            type="checkbox"
            checked={this.state.checked}
            disabled={this.props.disabled}
            onFocus={this.onFocus.bind(this)}
            onBlur={this.onBlur.bind(this)}
            onChange={this.onChange.bind(this)}
          />
        </span>
        <span className="el-checkbox__label">
          {this.state.label || this.props.children}
        </span>
      </label>
    )
  }
}

CheckBox.defaultProps = {
  checked: false,
  focus: false,
  trueLabel: '',
  falseLabel: '',
}

CheckBox.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  indeterminate: PropTypes.bool,
  focus: PropTypes.bool,
  trueLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  falseLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func
}