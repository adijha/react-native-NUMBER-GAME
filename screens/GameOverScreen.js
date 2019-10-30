import React from 'react';
import { View, Text, StyleSheet , Button} from 'react-native';

const GameOverScreen = () => {
	return (
		<View style={StyleSheet.screen}>
			<Text>The Game is Over</Text>
			<Text>Number of rounds: {props.roundsNumber} </Text>
			<Text>Number was: {props.userNumber} </Text>
			<Button title='Play Again' onPress={props.onRestart} />
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default GameOverScreen;
