<?php
// Include the header.php file from the current theme's directory.
get_header();
?>

<!-- Main Content -->
<div id="main-content">
    <?php
    // Start the WordPress Loop.
    if ( have_posts() ) :
        while ( have_posts() ) : the_post();
    ?>
        <!-- Display the title and content of the post. -->
        <h1><?php the_title(); ?></h1>
        <div><?php the_content(); ?></div>
    <?php
        // End the Loop.
        endwhile;
        else :
    ?>
        <p>Sorry, no posts matched your criteria.</p>
    <?php endif; ?>
</div>

<?php
// Include the sidebar.php and footer.php file from the current theme's directory.
get_sidebar();
get_footer();
?>