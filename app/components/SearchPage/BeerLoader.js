import React from 'react';
import ContentLoader from "react-content-loader"

const BeerLoader = () => {
  return (
    <ContentLoader
  		height={200}
  		width={400}
  		speed={2}
  		primaryColor={"#f3f3f3"}
  		secondaryColor={"#ecebeb"}
  	>
  		<rect x="23" y="12" rx="4" ry="4" width="117" height="6.4" />
  		<rect x="21" y="184" rx="3" ry="3" width="201" height="6.4" />
  		<rect x="20" y="32.05" rx="0" ry="0" width="199" height="135" />
  		<rect x="177" y="188.05" rx="0" ry="0" width="0" height="0" />
  	</ContentLoader>
  );
}

export default BeerLoader;
