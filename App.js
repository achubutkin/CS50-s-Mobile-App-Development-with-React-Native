import React from "react";
import { StyleSheet, Text, Button, ScrollView, View, Switch } from 'react-native';
import { Constants } from 'expo';

const styles = StyleSheet.create({
  todoContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  appContainer: {
    paddingTop: Constants.statusBarHeight
  },
  fill: {
    flex: 1
  }
});

let id = 0;

const Todo = props => (
  <View style={styles.todoContainer}>
    <Switch value={props.todo.checked} onValueChange={props.onToggle} />
    <Button onPress={props.onDelete} title="delete" />
    <Text>{props.todo.text}</Text>
  </View>
);

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: []
    };
  }

  addTodo() {
    id++;
    let text = `Todo number ${id}`;
    if (text) {
      this.setState({
        todos: [...this.state.todos, { id: id, text: text, checked: false }]
      });
    }
  }

  removeTodo(id) {
    this.setState({
      todos: this.state.todos.filter(val => val.id !== id)
    });
  }

  toggleTodo(id) {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.checked = !todo.checked;
        }
        return todo;
      })
    });
  }

  render() {
    return (
      <View style={[styles.appContainer, styles.fill]}>
        <Text>Todo count: {this.state.todos.length}</Text>
        <Text>Unchecked todos: {this.state.todos.filter(todo => !todo.checked).length}</Text>
        <Button onPress={() => this.addTodo()} title="Add TODO" />
        <ScrollView style={styles.fill}>
          {this.state.todos.map(todo => (
            <Todo
              key={todo.id}
              onToggle={() => this.toggleTodo(todo.id)}
              onDelete={() => this.removeTodo(todo.id)}
              todo={todo}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}