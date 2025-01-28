jQuery(document).ready(function () {
    jQuery('#wp-smart-login-bk').on('click', function (e) {
        e.preventDefault();

        var username = jQuery('input[name="sl-username"]').val(); 
        var password = jQuery('input[name="sl-password"]').val(); 
        var rememberMe = jQuery('input[name="sl-remember"]').is(':checked') ? 1 : 0;

        jQuery.ajax({
            type: 'POST',
            url: smart_login_object.ajax_url,
            data: {
                action: 'smart_login_bk',
                username: username,
                password: password,
                remember: rememberMe
            },
            success: function (response) {
                if (response.success) {
                    window.location.href = response.data.redirect_url;
                } else {
                    alert(response.data.message);
                }
            },
            error: function (xhr, status, error) {
                console.error(xhr.responseText);
            }
        });
    });
});
