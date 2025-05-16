import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor} from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import App from './App';
import { PostsPage } from './components/PostsPage';

test('renders Postspage and responds to like count', async () => {
  render(<PostsPage/>);
  const likeButton = screen.getByRole('button', {name: /like/i});
  await userEvent.click(likeButton)
  await waitFor(() => {
     expect(screen.getByText(/likes: 1/i)).toBeInTheDocument();
  })
 
});