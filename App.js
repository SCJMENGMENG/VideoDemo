/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity,Image} from 'react-native';

import Video from 'react-native-video';

var ImagePicker = require('react-native-image-picker');

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

    constructor(props) {
        super(props);

        this.state = {
            video: null,
            videoPause: true
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.instructions}>To get started, edit App.js</Text>
                <Text style={styles.instructions} onPress={() => {

                    this.pickVideo()
                }}>{instructions}</Text>
                {this.state.video ?
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                videoPause: !this.state.videoPause
                            })
                        }}
                        activeOpacity={1}
                        style={{position: 'relative'}}
                    >
                        <Video
                            ref={c => this.video = c}
                            source={{uri: this.state.video.uri}} // Looks for .mp4 file (background.mp4) in the given expansion version.
                            rate={1}                   // 0 is paused, 1 is normal.
                            volume={1.0}                 // 0 is muted, 1 is normal.
                            muted={true}                // Mutes the audio entirely.
                            paused={this.state.videoPause}               // Pauses playback entirely.
                            resizeMode="cover"           // Fill the whole screen at aspect ratio.
                            repeat={true}                // Repeat forever.
                            style={{width: 300, height: 300}}
                            //视频开始加载的回调
                            onLoadStart={this.loadStart}
                            onLoad={this.onLoad}
                            onProgress={this.onProgress}
                            onPlaybackRateChange={this.onPlaybackRateChange}
                        />
                        {this.state.videoPause ? <Image source={{uri:'http://img.25pp.com/uploadfile/soft/images/2015/0314/20150314120547391.jpg'}}
                                                        style={{position: 'absolute', width: 50, height: 50, top: 125, left: 125}}/> : null}
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                videoPause: !this.state.videoPause
                            })
                        }}
                        activeOpacity={1}
                        style={{position: 'relative'}}
                    >
                        <Video
                            ref={c => this.video = c}
                            source={{uri: 'http://mirror.aarnet.edu.au/pub/TED-talks/911Mothers_2010W-480p.mp4'}} // Looks for .mp4 file (background.mp4) in the given expansion version.
                            rate={1}                   // 0 is paused, 1 is normal.
                            volume={1.0}                 // 0 is muted, 1 is normal.
                            muted={false}                // Mutes the audio entirely.
                            paused={this.state.videoPause}               // Pauses playback entirely.
                            resizeMode="cover"           // Fill the whole screen at aspect ratio.
                            repeat={true}                // Repeat forever.
                            style={{width: 300, height: 300}}
                            //视频开始加载的回调
                            onLoadStart={this.loadStart()}
                            onLoad={this.onLoad}
                            onProgress={this.onProgress}
                            onPlaybackRateChange={this.onPlaybackRateChange}
                        />
                        {this.state.videoPause ? <Image source={{uri:'http://img.25pp.com/uploadfile/soft/images/2015/0314/20150314120547391.jpg'}}
                                                        style={{position: 'absolute', width: 50, height: 50, top: 125, left: 125}}/> : null}
                    </TouchableOpacity>
                }
            </View>
        );
    }

    loadStart = () => {

    }

    onLoad = (data) => {
        // this.setState({ duration: data.duration });
        // setTimeout(() => {
        //     this.setState({videoPause: true});
        // }, 20)
    };

    pickVideo() {
        ImagePicker.launchImageLibrary({
            mediaType: 'video',
            videoQuality: 'low',//'low', 'medium', or 'high' on iOS, 'low' or 'high' on Android
            durationLimit: 10,//Max video recording time, in seconds
        }, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // alert(JSON.stringify(response));
                this.setState({video: response, videoPause: false});//{path, uri}
                console.log('pickImage uri ==> ' + response.uri);
                alert(JSON.stringify(response))
            }
        });
    }


    // 项目用到的
    // export const VIDEO_CDN_DOMAIM = 'http://videocdn.aytianxia.com/';
    // /**
    //  * 处理选择后的视频～上传七牛云
    //  * @param video
    //  */
    // dealWithVideo(url) {
    //     let key = 'publishVideo' + "/" + new Date().getTime() + '.mp4';
    //     let formInput = {
    //         key: key,
    //     };
    //     putPolicy.scope = scope + ":" + key;
    //     let uptoken = putPolicy.token();
    //     Rpc.uploadFile(url, uptoken, formInput).then(data => {
    //         console.log(VIDEO_CDN_DOMAIM + key);
    //
    //         this.setState({videoUrl: VIDEO_CDN_DOMAIM + key})
    //     }).catch((error) => {
    //         console.log("upload error:" + error);
    //     });
    // }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
