import { Tooltip } from "@mui/material";
import React from "react";
import { countReactions, Reaction } from "../../common";

const ReactionIcons = ({ reactions }: { reactions: Reaction[] }) => {
  const reactionCounts = countReactions(reactions);

  return (
    <div className="flex space-x-4">
      {reactionCounts.map(
        (reaction) =>
          reaction.count > 0 && (
            <Tooltip key={reaction.value} title={`${reaction.count} lần`} arrow>
              <span className="text-xl cursor-pointer">{reaction.icon}</span>
            </Tooltip>
          )
      )}
    </div>
  );
};

export default ReactionIcons;
