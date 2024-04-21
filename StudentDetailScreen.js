import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const StudentDetailScreen = ({ route }) => {
  const { student } = route.params;
  const [studentName, setStudentName] = useState('');

  useEffect(() => {
    const fetchStudentName = async () => {
      try {
        // Fetch student's name based on student_id
        const response = await axios.get(`https://oneid-for-school-f1e0b199f01f.herokuapp.com/users/${student.student_id}`);
        setStudentName(`${response.data.given_name} ${response.data.last_name}`);
      } catch (error) {
        console.error('Error fetching student name:', error);
      }
    };

    fetchStudentName();
  }, [student.student_id]);

  // Function to handle accepting the student
  const handleAccept = () => {
    // Implement logic to accept the student
    console.log('Accepted:', student);
  };

  // Function to handle declining the student
  const handleDecline = () => {
    // Implement logic to decline the student
    console.log('Declined:', student);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Details</Text>
      <Text>{`Student Name: ${studentName}`}</Text>
      <Text>{`Student ID: ${student.student_id}`}</Text>
      {/* Display additional student information as needed */}
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: 'green' }]} onPress={handleAccept}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={handleDecline}>
          <Text style={styles.buttonText}>Decline</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default StudentDetailScreen;
