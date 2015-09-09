<div class="twitter-reader content">
    <%= content %>
    <%= isRetweeted ? "Retweeted" : "" %>
</div>
<div class="twitter-reader footer">
    <%= formattedCreatedAt %>
    <div class="twitter-reader user">
        <span class="username"><%= userName %></span>
        <span class="useravatar"><img src="<%= userAvatar %>" /></span>
    </div>
</div>