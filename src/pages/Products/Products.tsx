import React from 'react';
import Button from 'atomic-components/Button';

function Products() {
  return (
    <div>
      Hello Ladies and Gentlemen
      <Button onClick={() => console.log('Button clicked')}>
        Products List
      </Button>
    </div>
  );
}

export default Products;
