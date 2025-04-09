import React, { useState } from 'react';
import { Table, Button, Checkbox, Input, Select, Row, Col, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Container, Toast } from 'reactstrap';
import Toaster from './Toaster';

const { Option } = Select;

const ExerciseTable = ({user, setUser}) => {
  const [dataSource, setDataSource] = useState([]);
  const [form] = Form.useForm();
  const [showAddExerciseToast, setShowAddExcerciseToast] = useState(false)
  const [showNotCompleteToast, setShowNotCompleteToast] = useState(false)
  const [showAddScoreToast, setShowAddScoreToast] = useState(false) 
  const [exercises] = useState([
    { id: 1, name: 'Push-up' },
    { id: 2, name: 'Squat' },
    { id: 3, name: 'Lunges' },
    { id: 4, name: 'Plank' },
  ]);
  const [userScore, setUserScore] = useState(user.score);

  const navigate = useNavigate();

  // Add a new exercise to the table
  const handleAdd = (exerciseName, sets, reps) => {
    const newData = {
      key: dataSource.length + 1,
      exercise: exerciseName,
      sets,
      reps,
      completed: false,
    };
    setDataSource([...dataSource, newData]);
    form.resetFields(); 
    setShowAddExcerciseToast(true)
    setTimeout(() => {setShowAddExcerciseToast(false)}, 1000)
  };

  // Update checkbox completion state
  const handleCheckboxChange = (key) => {
    const updatedData = dataSource.map((item) => {
      if (item.key === key) {
        item.completed = !item.completed;
      }
      return item;
    });
    setDataSource(updatedData);
  };

    // Handle exercise removal
    const handleDelete = (key) => {
        const updatedData = dataSource.filter((item) => item.key !== key);
        setDataSource(updatedData);
      };

      const checkCompletion = () => {
        // Check if all exercises are completed
        const allCompleted = dataSource.every(item => item.completed);
        if(!allCompleted){
            setShowNotCompleteToast(true)
            setTimeout(() => {
                setShowNotCompleteToast(false)
            },1000)
        }
      
        if (allCompleted) {
          const updatedScore = userScore + 2.5; // Increase the score by 2.5 points
      
          // Find the user to update (for this example, we'll assume we know the user's ID)
          const userId = user.id; // You can dynamically set this based on the logged-in user, for example
      
          // Make the API request to update the user's score
          fetch(`http://localhost:5000/users/${userId}`, {
            method: 'PATCH', // Use PATCH to update only the score
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ score: updatedScore }),
          })
            .then((response) => response.json())
            .then((data) => {
            //   console.log('Score updated:', data);
              setUserScore(updatedScore); // Update the local score state
              setUser({
                ...user,
                score: updatedScore
              })
              setDataSource([])
              setShowAddScoreToast(true)
              setTimeout(() => {setShowAddScoreToast(false)}, 1000)
            })
            .catch((error) => {
              console.error('Error updating score:', error);
            });
        } else {
          console.log("Not all exercises are completed.");
        }
      };

  // Columns definition for Ant Design Table
  const columns = [
    {
      title: 'Exercise',
      dataIndex: 'exercise',
      key: 'exercise',
    },
    {
      title: 'Sets',
      dataIndex: 'sets',
      key: 'sets',
    },
    {
      title: 'Reps',
      dataIndex: 'reps',
      key: 'reps',
    },
    {
      title: 'Completed',
      key: 'completed',
      render: (_, record) => (
        <Checkbox
          checked={record.completed}
          onChange={() => handleCheckboxChange(record.key)}
        />
      ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Button
            className='bg-danger text-white fw-bold'
            onClick={() => handleDelete(record.key)}
          >
            Delete
          </Button>
        ),
      },
  ];

  return (
    <Container>
        <h4 className="mb-4">Create Your Own List</h4>
      
       
          <Form form={form} layout="inline" onFinish={(values) => handleAdd(values.exercise, values.sets, values.reps)}>
            <Form.Item name="exercise" label="Exercise">
              <Select placeholder="Select an exercise" style={{ width: 150 }}>
                {exercises.map(exercise => (
                  <Option key={exercise.id} value={exercise.name}>
                    {exercise.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="sets"
              label="Sets"
              rules={[{ required: true, message: 'Please enter sets' }]}
            >
              <Input type="number" min={1} placeholder="Sets" />
            </Form.Item>
            <Form.Item
              name="reps"
              label="Reps"
              rules={[{ required: true, message: 'Please enter reps' }]}
            >
              <Input type="number" min={1} placeholder="Reps" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add Exercise
              </Button>
            </Form.Item>
          </Form>
       
     
      
      <Table
        bordered
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        rowKey="key"
        style={{ marginTop: '20px' }}
      />
      
      <Button
        type="primary"
        onClick={checkCompletion}
        style={{ marginTop: '20px' }}
        disabled={dataSource.length === 0}
      >
        Check Completion and Submit
      </Button>
      {showAddExerciseToast && <Toaster message="Excercise added to list" title="Exercise Addition Confirmation" />}
      {showNotCompleteToast && <Toaster message="Exercise incomplete. Either complete or delete to add record." title="Exercise Imcomplete Alert" />}
      {showAddScoreToast && <Toaster message="Progress recorded" title="Progress Record Confirmation"/>  }
      </Container>
  );
};

export default ExerciseTable;
