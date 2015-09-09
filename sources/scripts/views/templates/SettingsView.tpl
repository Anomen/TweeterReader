<form>
    <select>
        <option value="default" <%= theme === "default" ? "selected" : "" %>>Default Theme</option>
        <option value="dark-theme" <%= theme === "dark-theme" ? "selected" : "" %>>Dark Theme</option>
    </select>
    <input class='tgl tgl-skewed' id='cb3' type='checkbox' <%= isEditMode ? "checked='checked'" : "" %> />
    <label class='tgl-btn' data-tg-off='EDIT&nbsp;OFF' data-tg-on='EDIT&nbsp;ON' for='cb3'></label>
</form>
