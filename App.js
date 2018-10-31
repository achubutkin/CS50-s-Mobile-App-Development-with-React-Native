import React from "react";
import { StyleSheet, Text, Button, ScrollView, View } from 'react-native';

let id = 0;

const Todo = props => (
  <View>
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
      <View>
        <Text>Todo count: {this.state.todos.length}</Text>
        <Text>Unchecked todos: {this.state.todos.filter(todo => !todo.checked).length}</Text>
        <Button onPress={() => this.addTodo()} title="Add TODO" />
        <ScrollView>
          {this.state.todos.map(todo => (
            <Todo
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

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};