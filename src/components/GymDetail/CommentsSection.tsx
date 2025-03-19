
import React from 'react';
import GymComments from '../GymComments';

interface CommentsSectionProps {
  gymId: string;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ gymId }) => {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <GymComments gymId={gymId} />
      </div>
    </section>
  );
};

export default CommentsSection;
