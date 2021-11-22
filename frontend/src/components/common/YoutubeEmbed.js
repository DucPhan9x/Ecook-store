import React from "react";
import PropTypes from "prop-types";

const YoutubeEmbed = ({ id, videoUrl }) => (
  <iframe
    id={id}
    src={videoUrl}
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    title="Embedded youtube"
  />
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
};

export default YoutubeEmbed;
