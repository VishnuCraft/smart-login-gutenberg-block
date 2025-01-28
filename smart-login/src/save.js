import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @param {Object} props            Properties passed to the function.
 * @param {Object} props.attributes Available block attributes.
 *
 * @return {Element} Element to render.
 */
export default function save( { attributes } ) {
	const {
		usernameLabel,
		passwordLabel,
		usernameClass,
		passwordClass,
		redirectURL,
		rememberMe,
		buttonClass,
		buttonLabel
	} = attributes;

	/** Return the markup for the frontend */
	return (
		<div { ...useBlockProps.save() }>
			{/* <form method="post" action={ redirectURL ? redirectURL : '#' }> */}
			<form method="post">
				<label>
					{ usernameLabel }
					<input type="text" className={ usernameClass } name="sl-username" required /> {/* smart login username field name */}
				</label>
				<label>
					{ passwordLabel }
					<input type="password" className={ passwordClass } name="sl-password" required /> {/* smart login password field name */}
				</label>
				{ rememberMe && (
					<label>
						<input type="checkbox" name="sl-remember" /> {/* smart login remember me field name */}
						{ __('Remember Me', 'smart-login') } {/* Use __ for translation */}
					</label>
				) }
				<button type="submit" className={ buttonClass } id="wp-smart-login-bk">
					{ buttonLabel || __( 'Login', 'smart-login' ) }
				</button> {/* Use __ for translation */}
			</form>
		</div>
	);
}
