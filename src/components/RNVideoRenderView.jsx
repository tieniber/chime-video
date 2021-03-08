/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT-0
 */
import { Component, createElement } from "react";
import { findNodeHandle, requireNativeComponent } from "react-native";
import { NativeFunction } from "react-native-bridgera-aws-chime";
import PropTypes from "prop-types";

export class RNVideoRenderView extends Component {
    componentDidMount() {}

    componentWillUnmount() {
        console.debug("unbinding video tile: " + this.props.tileId);
        NativeFunction.unbindVideoView(this.props.tileId);
    }

    render() {
        // we need to delay the bind video
        // Because "componentDidMount" will be called "immediately after the initial rendering occurs"
        // This is *before* RCTUIManager add this view to register (so that viewForReactTag() can return a view)
        // So we need to dispatch bindVideoView after this function complete
        setTimeout(() => {
            console.debug("binding video tile: " + this.props.tileId);
            NativeFunction.bindVideoView(findNodeHandle(this), this.props.tileId);
            if (!window.videoHandle) {
                window.videoHandle = {};
            }
            window.videoHandle[this.props.tileId] = findNodeHandle(this);
        }, 1000);
        return <RNVideoRenderViewNative {...this.props} />;
    }
}

RNVideoRenderView.propTypes = {
    /**
     * A int value to identifier the Video view, will be used to bind video stream later
     */
    tileId: PropTypes.number
};

var RNVideoRenderViewNative = requireNativeComponent("RNVideoView", RNVideoRenderView);
