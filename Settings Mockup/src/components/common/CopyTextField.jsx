import { useState } from 'react';
import { TextField, InputAdornment, IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

const CopyTextField = (props) => {
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(props.value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <TextField
      {...props}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      InputProps={{
        ...props.InputProps,
        endAdornment: (
          <InputAdornment position="end" sx={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.2s' }}>
            <Tooltip title={copied ? "Copied!" : "Copy value"}>
              <IconButton 
                size="small" 
                onClick={handleCopy}
                onMouseDown={(e) => e.preventDefault()} // Prevent focus loss
              >
                {copied ? <CheckIcon fontSize="small" color="success" /> : <ContentCopyIcon fontSize="small" />}
              </IconButton>
            </Tooltip>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default CopyTextField;
