import React, { useState, useEffect } from 'react';
import { io } from "socket.io-client";


const MessagePage = () => {
    return (
        <div>
            <div>
                <MessagesSidebar />
            </div>

            <div>
                <MessageContainer />
            </div>
        </div>
    );
}

export default MessagePage;
