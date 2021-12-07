import React from "react";
import PropTypes from "prop-types";

const YoutubeEmbed = ({ id, videoUrl }) => (
  <video id={id} controls>
    <source src={videoUrl} />
  </video>
  // <iframe
  //   id={id}
  //   frameBorder="0"
  //   allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  //   allowFullScreen
  //   src={videoUrl}
  //   title="Embedded youtube"
  // />
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
};

export default YoutubeEmbed;
