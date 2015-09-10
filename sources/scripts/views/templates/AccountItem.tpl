<form>
    <div class="title">
        @<%= username %>
        <div class="loading">
            <div class="cssload-container">
                <div class="cssload-double-torus"></div>
            </div>
        </div>
    </div>
    <div class="twitter-reader error card" style="display: none">
    </div>
    <div class="settings">
        <div class="twitter-reader settings card">
            <fieldset>
                <legend>Account</legend>
                <input type="text" value="<%= username %>" name="username" />
            </fieldset>
            <fieldset>
                <legend>Number of tweets</legend>
                <input type="number" value="<%= numberOfTweets %>" name="numberOfTweets" />
            </fieldset>
            <fieldset>
                <legend>Date range</legend>
                <input type="text" name="from" value="<%= from %>" placeholder="From" />
                <input type="text" name="to" value="<%= to %>" placeholder="To" />
                <div class="note">Note that Twitter does not allow to search for tweets earlier than 1 week ago.</div>
            </fieldset>
        </div>
    </div>
    <div class="twitter-reader content">
    </div>
</form>