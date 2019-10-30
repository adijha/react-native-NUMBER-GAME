import React, { useState } from 'react';
import { Button, View, Text, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import Color from '../constants/colors';
import NumberContainer from '../components/NumberContainer';

const StartGameScreen = (props) => {
	const [ enteredValue, setEnteredValue ] = useState('');

	const [ confirmed, setConfirmed ] = useState(false);
	const [ selectedNumber, setSelectedNumber ] = useState();

	const numberInputHandler = (inputText) => {
		setEnteredValue(inputText.replace(/[^0-9]/g, ''));
	};

	const resetInputHandler = () => {
		setEnteredValue('');
		setConfirmed(false);
	};
	const confirmInputHandler = () => {
		const choosenNumber = parseInt(enteredValue);
		if (isNaN(choosenNumber) || choosenNumber <= 0 || choosenNumber > 99) {
			Alert.alert('Invalid number', 'Number should be between 1 to 99', [
				{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }
			]);

			return;
		}
		setConfirmed(true);
		setSelectedNumber(choosenNumber);
		setEnteredValue('');
	};

	let confirmedOutput;
	if (confirmed) {
		confirmedOutput = (
			<Card style={styles.summaryContainer}>
				<Text>You Selected</Text>
				<NumberContainer>{selectedNumber}</NumberContainer>
				<Button title="START GAME" onPress={() => props.onStartGame(selectedNumber)} />
			</Card>
		);
	}

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.screen}>
				<Text style={styles.title}>Start a New Game !</Text>

				<Card style={styles.inputContainer}>
					<Text>Select a number</Text>
					<Input
						style={styles.input}
						blurOnSubmit
						autoCapitalize="none"
						autoCorrect={false}
						keyboardType="number-pad"
						maxLength={2}
						onChangeText={numberInputHandler}
						value={enteredValue}
					/>
					<View style={styles.buttonContainer}>
						<View style={styles.button}>
							<Button title="Reset" onPress={resetInputHandler} color={Color.accent} />
						</View>
						<View style={styles.button}>
							<Button title="Confirm" onPress={confirmInputHandler} color={Color.primary} />
						</View>
					</View>
				</Card>
				{confirmedOutput}
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center'
	},
	title: {
		fontSize: 20,
		marginVertical: 10
	},
	inputContainer: {
		width: 300,
		maxWidth: '80%',
		alignItems: 'center'
	},
	buttonContainer: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between',
		paddingHorizontal: 15
	},
	button: {
		width: 100
	},
	input: {
		width: 50,
		textAlign: 'center'
	},
	summaryContainer: {
		marginTop: 20,
		alignItems: 'center'
	}
});

export default StartGameScreen;
