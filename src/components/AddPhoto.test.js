import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AddPhoto from './AddPhoto';

describe('AddPhoto', () => {
  test('should call onAdd function with correct data when form is submitted', () => {
    const mockOnAdd = jest.fn();
    const { getByPlaceholderText, getByText } = render(<AddPhoto onAdd={mockOnAdd} />);
    const titleInput = getByPlaceholderText('Title');
    const urlInput = getByPlaceholderText('URL');
    const thumbnailUrlInput = getByPlaceholderText('Thumbnail URL');
    const uploadButton = getByText('Upload');

    // Simulate user input
    fireEvent.change(titleInput, { target: { value: 'Example Title' } });
    fireEvent.change(urlInput, { target: { value: 'https://example.com/image.jpg' } });
    fireEvent.change(thumbnailUrlInput, { target: { value: 'https://example.com/thumbnail.jpg' } });

    // Submit the form
    fireEvent.click(uploadButton);

    // Check if onAdd function is called with correct data
    expect(mockOnAdd).toHaveBeenCalledWith({
      title: 'Example Title',
      url: 'https://example.com/image.jpg',
      thumbnailUrl: 'https://example.com/thumbnail.jpg',
    });

    // Check if input fields are cleared after form submission
    expect(titleInput.value).toBe('');
    expect(urlInput.value).toBe('');
    expect(thumbnailUrlInput.value).toBe('');
  });

  test('should display an alert when submitting the form with empty fields', () => {
    global.alert = jest.fn(); // Przypisanie mocka funkcji alert
  
    const { getByText } = render(<AddPhoto onAdd={jest.fn()} />);
    const uploadButton = getByText('Upload');
  
    // Submit the form without filling in any fields
    fireEvent.click(uploadButton);
  
    // Check if alert message is displayed
    expect(global.alert).toHaveBeenCalledWith('All fields are required');
  });
  
});
