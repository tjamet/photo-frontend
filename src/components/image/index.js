import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';


const Status = {
  PENDING: 'pending',
  LOADING: 'loading',
  LOADED: 'loaded',
  FAILED: 'failed',
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo(ms, f) {
  console.log('Taking a break...');
  await sleep(ms);
  console.log('Two second later');
  f();
}

export default class Thumbnail extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    onLoad: PropTypes.func,
    onError: PropTypes.func,
    onClick: PropTypes.func,
  }


  constructor(props) {
    super(props);
    this.state = { status: props.src ? Status.LOADING : Status.PENDING };
  }

  componentDidMount() {
    if (this.state.status === Status.LOADING) {
      this.createLoader();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.src !== nextProps.src) {
      this.setState({
        status: nextProps.src ? Status.LOADING : Status.PENDING,
      });
    }
  }

  componentDidUpdate() {
    if (this.state.status === Status.LOADING && !this.img) {
      this.createLoader();
    }
  }

  componentWillUnmount() {
    this.destroyLoader();
  }

  createLoader() {
    this.destroyLoader();  // We can only have one loader at a time.

    this.img = new Image();
    this.img.onload = this.handleLoad.bind(this);
    this.img.onerror = this.handleError.bind(this);
    this.img.src = this.props.src;
  }

  destroyLoader() {
    if (this.img) {
      this.img.onload = null;
      this.img.onerror = null;
      this.img = null;
    }
  }

  handleLoad(event) {
    this.destroyLoader();
    this.setState({ status: Status.LOADED });

    if (this.props.onLoad) this.props.onLoad(event);
  }

  handleError(error) {
    this.destroyLoader();
    this.setState({ status: Status.FAILED });

    if (this.props.onError) this.props.onError(error);
  }
  render() {
    if (this.state.status == Status.LOADED) {
      return <div className={styles.thumbnail} style={{ backgroundImage: "url(" + this.props.src + ")" }} onClick={(event) => {
        if (this.props.onClick) this.props.onClick(event);
      }} />
    } else {
      return null;
    }
  }
}