import { Component, createElement } from "react";
import { RNVideoRenderView } from "./components/RNVideoRenderView";
import { View } from "react-native";

const videoContainer = {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    // This is an existing React Native issue:
    // When you create a native android component
    // that use GLSurfaceView (We use this internally), the entire screen will
    // black out
    overflow: "hidden"
};
const video = {
    width: "100%",
    margin: "1%",
    aspectRatio: 1
};

export class ChimeVideo extends Component {
    render() {
        const { tileId } = this.props;
        return (
            <View style={videoContainer}>
                {tileId && tileId.status === "available" ? (
                    <RNVideoRenderView
                        style={video}
                        key={parseInt(tileId.displayValue, 10)}
                        tileId={parseInt(tileId.displayValue, 10)}
                    />
                ) : null}
            </View>
        );
    }
}
